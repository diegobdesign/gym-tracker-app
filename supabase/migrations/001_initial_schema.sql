-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROFILES TABLE
-- =====================================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),

  -- Metrics
  current_weight DECIMAL(5,2),
  height DECIMAL(5,2),
  body_fat_percentage DECIMAL(4,2),

  -- Goals
  target_weight DECIMAL(5,2),
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),
  primary_goal TEXT CHECK (primary_goal IN ('strength', 'hypertrophy', 'endurance', 'weight_loss', 'general_fitness')),

  -- Preferences
  preferred_units TEXT DEFAULT 'metric' CHECK (preferred_units IN ('metric', 'imperial')),

  -- Onboarding
  onboarding_completed BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- EXERCISES TABLE
-- =====================================================
CREATE TABLE exercises (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  video_url TEXT,

  -- Categorization
  primary_muscle_group TEXT NOT NULL,
  secondary_muscle_groups TEXT[],
  equipment TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  exercise_type TEXT CHECK (exercise_type IN ('compound', 'isolation', 'cardio')),

  -- Custom exercise tracking
  is_custom BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES profiles(id),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- ROUTINES TABLE
-- =====================================================
CREATE TABLE routines (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  is_template BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- ROUTINE_EXERCISES TABLE (Join table)
-- =====================================================
CREATE TABLE routine_exercises (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  routine_id UUID REFERENCES routines(id) ON DELETE CASCADE NOT NULL,
  exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE NOT NULL,

  -- Exercise configuration
  order_index INTEGER NOT NULL,
  target_sets INTEGER NOT NULL,
  target_reps_min INTEGER,
  target_reps_max INTEGER,
  rest_period_seconds INTEGER DEFAULT 90,
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),

  UNIQUE(routine_id, exercise_id, order_index)
);

-- =====================================================
-- WORKOUTS TABLE
-- =====================================================
CREATE TABLE workouts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  routine_id UUID REFERENCES routines(id) ON DELETE SET NULL,

  -- Workout metadata
  name TEXT NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- WORKOUT_EXERCISES TABLE
-- =====================================================
CREATE TABLE workout_exercises (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workout_id UUID REFERENCES workouts(id) ON DELETE CASCADE NOT NULL,
  exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE NOT NULL,

  order_index INTEGER NOT NULL,
  notes TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- WORKOUT_SETS TABLE
-- =====================================================
CREATE TABLE workout_sets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workout_exercise_id UUID REFERENCES workout_exercises(id) ON DELETE CASCADE NOT NULL,

  set_number INTEGER NOT NULL,
  weight DECIMAL(6,2),
  reps INTEGER NOT NULL,
  rpe DECIMAL(3,1) CHECK (rpe >= 0 AND rpe <= 10),
  is_warmup BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- WEIGHT_LOGS TABLE
-- =====================================================
CREATE TABLE weight_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  weight DECIMAL(5,2) NOT NULL,
  logged_at DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),

  UNIQUE(user_id, logged_at)
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX idx_exercises_muscle_group ON exercises(primary_muscle_group);
CREATE INDEX idx_exercises_equipment ON exercises(equipment);
CREATE INDEX idx_exercises_custom ON exercises(is_custom, created_by);

CREATE INDEX idx_routines_user ON routines(user_id);
CREATE INDEX idx_routine_exercises_routine ON routine_exercises(routine_id);

CREATE INDEX idx_workouts_user ON workouts(user_id);
CREATE INDEX idx_workouts_date ON workouts(started_at DESC);
CREATE INDEX idx_workout_exercises_workout ON workout_exercises(workout_id);
CREATE INDEX idx_workout_sets_exercise ON workout_sets(workout_exercise_id);

CREATE INDEX idx_weight_logs_user_date ON weight_logs(user_id, logged_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE routine_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE weight_logs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Exercises policies (public read, authenticated create custom)
CREATE POLICY "Anyone can view non-custom exercises" ON exercises
  FOR SELECT USING (is_custom = FALSE OR created_by = auth.uid());

CREATE POLICY "Authenticated users can create custom exercises" ON exercises
  FOR INSERT WITH CHECK (auth.uid() = created_by AND is_custom = TRUE);

CREATE POLICY "Users can update own custom exercises" ON exercises
  FOR UPDATE USING (auth.uid() = created_by AND is_custom = TRUE);

CREATE POLICY "Users can delete own custom exercises" ON exercises
  FOR DELETE USING (auth.uid() = created_by AND is_custom = TRUE);

-- Routines policies
CREATE POLICY "Users can view own routines" ON routines
  FOR SELECT USING (auth.uid() = user_id OR is_template = TRUE);

CREATE POLICY "Users can create own routines" ON routines
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own routines" ON routines
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own routines" ON routines
  FOR DELETE USING (auth.uid() = user_id);

-- Routine exercises policies
CREATE POLICY "Users can view routine exercises for accessible routines" ON routine_exercises
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM routines
      WHERE routines.id = routine_exercises.routine_id
      AND (routines.user_id = auth.uid() OR routines.is_template = TRUE)
    )
  );

CREATE POLICY "Users can manage routine exercises for own routines" ON routine_exercises
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM routines
      WHERE routines.id = routine_exercises.routine_id
      AND routines.user_id = auth.uid()
    )
  );

-- Workouts policies
CREATE POLICY "Users can view own workouts" ON workouts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own workouts" ON workouts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own workouts" ON workouts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own workouts" ON workouts
  FOR DELETE USING (auth.uid() = user_id);

-- Workout exercises policies
CREATE POLICY "Users can manage workout exercises for own workouts" ON workout_exercises
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM workouts
      WHERE workouts.id = workout_exercises.workout_id
      AND workouts.user_id = auth.uid()
    )
  );

-- Workout sets policies
CREATE POLICY "Users can manage sets for own workout exercises" ON workout_sets
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM workout_exercises
      JOIN workouts ON workouts.id = workout_exercises.workout_id
      WHERE workout_exercises.id = workout_sets.workout_exercise_id
      AND workouts.user_id = auth.uid()
    )
  );

-- Weight logs policies
CREATE POLICY "Users can view own weight logs" ON weight_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own weight logs" ON weight_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own weight logs" ON weight_logs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own weight logs" ON weight_logs
  FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exercises_updated_at BEFORE UPDATE ON exercises
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_routines_updated_at BEFORE UPDATE ON routines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
