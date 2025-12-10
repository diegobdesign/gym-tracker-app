-- Seed exercise library with 50+ common exercises
INSERT INTO exercises (name, description, instructions, primary_muscle_group, secondary_muscle_groups, equipment, difficulty, exercise_type, is_custom) VALUES

-- =====================================================
-- CHEST EXERCISES
-- =====================================================
('Barbell Bench Press', 'Classic chest builder', 'Lie on bench with feet flat on floor. Lower bar to chest, press up explosively while maintaining control.', 'chest', ARRAY['shoulders', 'triceps'], 'barbell', 'beginner', 'compound', FALSE),
('Dumbbell Bench Press', 'Chest press with dumbbells for greater range of motion', 'Lie on bench, press dumbbells from chest level to full extension. Control the descent.', 'chest', ARRAY['shoulders', 'triceps'], 'dumbbells', 'beginner', 'compound', FALSE),
('Incline Barbell Bench Press', 'Upper chest focus', 'Press on inclined bench (30-45 degrees) to target upper pecs.', 'chest', ARRAY['shoulders', 'triceps'], 'barbell', 'intermediate', 'compound', FALSE),
('Incline Dumbbell Press', 'Upper chest with dumbbells', 'Press dumbbells on incline bench for upper chest development.', 'chest', ARRAY['shoulders', 'triceps'], 'dumbbells', 'intermediate', 'compound', FALSE),
('Dumbbell Flyes', 'Chest isolation', 'Lie on bench, arc dumbbells out and up with slight elbow bend. Focus on the stretch.', 'chest', '{}', 'dumbbells', 'beginner', 'isolation', FALSE),
('Push-ups', 'Bodyweight chest exercise', 'Standard push-up position, lower chest to ground and push back up.', 'chest', ARRAY['shoulders', 'triceps'], 'bodyweight', 'beginner', 'compound', FALSE),
('Cable Crossover', 'Chest isolation with cables', 'Pull cables across body in arc motion, squeeze at the center.', 'chest', '{}', 'cable', 'intermediate', 'isolation', FALSE),
('Decline Bench Press', 'Lower chest emphasis', 'Press on declined bench to target lower pecs.', 'chest', ARRAY['shoulders', 'triceps'], 'barbell', 'intermediate', 'compound', FALSE),

-- =====================================================
-- BACK EXERCISES
-- =====================================================
('Barbell Deadlift', 'King of posterior chain exercises', 'Lift barbell from ground to standing position, hinge at hips, keep back straight.', 'back', ARRAY['legs', 'glutes'], 'barbell', 'intermediate', 'compound', FALSE),
('Pull-ups', 'Bodyweight back builder', 'Hang from bar with overhand grip, pull chin over bar, control descent.', 'back', ARRAY['biceps'], 'bodyweight', 'intermediate', 'compound', FALSE),
('Chin-ups', 'Pull-ups with underhand grip', 'Same as pull-ups but with palms facing you. More bicep engagement.', 'back', ARRAY['biceps'], 'bodyweight', 'intermediate', 'compound', FALSE),
('Barbell Row', 'Horizontal pulling for back thickness', 'Bent over row with barbell, pull to lower abdomen.', 'back', ARRAY['biceps'], 'barbell', 'intermediate', 'compound', FALSE),
('Lat Pulldown', 'Vertical pulling machine', 'Pull bar down to chest, squeeze shoulder blades together.', 'back', ARRAY['biceps'], 'machine', 'beginner', 'compound', FALSE),
('Seated Cable Row', 'Horizontal pulling', 'Row cable handle to torso, keep chest up and shoulders back.', 'back', ARRAY['biceps'], 'cable', 'beginner', 'compound', FALSE),
('Dumbbell Row', 'Single arm back work', 'Row dumbbell to hip while supporting yourself with other arm.', 'back', ARRAY['biceps'], 'dumbbells', 'beginner', 'compound', FALSE),
('Face Pulls', 'Rear delt and upper back', 'Pull rope attachment to face level, external rotate at end.', 'back', ARRAY['shoulders'], 'cable', 'beginner', 'isolation', FALSE),
('T-Bar Row', 'Back thickness builder', 'Row T-bar to chest, maintain flat back position.', 'back', ARRAY['biceps'], 'barbell', 'intermediate', 'compound', FALSE),

-- =====================================================
-- LEG EXERCISES
-- =====================================================
('Barbell Squat', 'King of leg exercises', 'Squat with barbell on back, descend until thighs parallel or below.', 'legs', ARRAY['glutes'], 'barbell', 'intermediate', 'compound', FALSE),
('Front Squat', 'Quad-dominant squat variation', 'Barbell held in front across shoulders, more upright torso.', 'legs', ARRAY['glutes'], 'barbell', 'advanced', 'compound', FALSE),
('Romanian Deadlift', 'Hamstring focus', 'Hip hinge with slight knee bend, feel stretch in hamstrings.', 'legs', ARRAY['glutes', 'back'], 'barbell', 'intermediate', 'compound', FALSE),
('Leg Press', 'Machine squat variation', 'Press platform with feet, maintain lower back contact with pad.', 'legs', ARRAY['glutes'], 'machine', 'beginner', 'compound', FALSE),
('Leg Curl', 'Hamstring isolation', 'Curl weight with legs on machine, squeeze at top.', 'legs', '{}', 'machine', 'beginner', 'isolation', FALSE),
('Leg Extension', 'Quad isolation', 'Extend legs against resistance, squeeze quads at top.', 'legs', '{}', 'machine', 'beginner', 'isolation', FALSE),
('Bulgarian Split Squat', 'Single leg squat', 'Rear foot elevated split squat, great for balance and strength.', 'legs', ARRAY['glutes'], 'dumbbells', 'intermediate', 'compound', FALSE),
('Walking Lunges', 'Unilateral leg work', 'Step forward and lower into lunge, alternate legs walking forward.', 'legs', ARRAY['glutes'], 'bodyweight', 'beginner', 'compound', FALSE),
('Calf Raises', 'Calf isolation', 'Raise up on toes as high as possible, squeeze at top.', 'legs', '{}', 'machine', 'beginner', 'isolation', FALSE),
('Hack Squat', 'Machine-based quad builder', 'Squat on hack squat machine for quad development.', 'legs', ARRAY['glutes'], 'machine', 'intermediate', 'compound', FALSE),

-- =====================================================
-- SHOULDER EXERCISES
-- =====================================================
('Overhead Press', 'Vertical pressing', 'Press barbell overhead from shoulders, lock out at top.', 'shoulders', ARRAY['triceps'], 'barbell', 'intermediate', 'compound', FALSE),
('Dumbbell Shoulder Press', 'Overhead press with dumbbells', 'Press dumbbells overhead, can be done seated or standing.', 'shoulders', ARRAY['triceps'], 'dumbbells', 'beginner', 'compound', FALSE),
('Lateral Raises', 'Side delt isolation', 'Raise dumbbells to sides until parallel with ground.', 'shoulders', '{}', 'dumbbells', 'beginner', 'isolation', FALSE),
('Front Raises', 'Front delt isolation', 'Raise weight in front of body to shoulder height.', 'shoulders', '{}', 'dumbbells', 'beginner', 'isolation', FALSE),
('Arnold Press', 'Compound shoulder press with rotation', 'Press with rotation from palms facing you to facing forward.', 'shoulders', ARRAY['triceps'], 'dumbbells', 'intermediate', 'compound', FALSE),
('Reverse Flyes', 'Rear delt focus', 'Bend over and raise dumbbells to sides, pinch shoulder blades.', 'shoulders', ARRAY['back'], 'dumbbells', 'beginner', 'isolation', FALSE),
('Upright Row', 'Traps and side delts', 'Row barbell or dumbbells up along body to chest level.', 'shoulders', ARRAY['back'], 'barbell', 'intermediate', 'compound', FALSE),

-- =====================================================
-- ARM EXERCISES
-- =====================================================
('Barbell Curl', 'Bicep mass builder', 'Curl barbell to shoulders, keep elbows tucked.', 'biceps', '{}', 'barbell', 'beginner', 'isolation', FALSE),
('Dumbbell Curl', 'Alternating or simultaneous bicep curls', 'Curl dumbbells to shoulders with supination.', 'biceps', '{}', 'dumbbells', 'beginner', 'isolation', FALSE),
('Hammer Curl', 'Neutral grip curls', 'Curl with palms facing each other, works brachialis.', 'biceps', ARRAY['forearms'], 'dumbbells', 'beginner', 'isolation', FALSE),
('Preacher Curl', 'Strict bicep curl', 'Curl with arms supported on preacher bench.', 'biceps', '{}', 'barbell', 'beginner', 'isolation', FALSE),
('Tricep Dips', 'Bodyweight triceps', 'Lower and raise body between parallel bars or bench.', 'triceps', ARRAY['chest'], 'bodyweight', 'intermediate', 'compound', FALSE),
('Tricep Pushdown', 'Cable tricep isolation', 'Push cable attachment down, lock out at bottom.', 'triceps', '{}', 'cable', 'beginner', 'isolation', FALSE),
('Skull Crushers', 'Lying tricep extension', 'Lower bar to forehead, extend back to start.', 'triceps', '{}', 'barbell', 'intermediate', 'isolation', FALSE),
('Close-Grip Bench Press', 'Tricep compound', 'Bench press with hands inside shoulder width.', 'triceps', ARRAY['chest'], 'barbell', 'intermediate', 'compound', FALSE),
('Overhead Tricep Extension', 'Tricep stretch exercise', 'Extend dumbbell or cable overhead, feel stretch at bottom.', 'triceps', '{}', 'dumbbells', 'beginner', 'isolation', FALSE),

-- =====================================================
-- CORE EXERCISES
-- =====================================================
('Plank', 'Core stability', 'Hold push-up position with forearms on ground.', 'core', '{}', 'bodyweight', 'beginner', 'isolation', FALSE),
('Crunches', 'Abdominal isolation', 'Lift shoulders off ground, contract abs.', 'core', '{}', 'bodyweight', 'beginner', 'isolation', FALSE),
('Russian Twists', 'Oblique work', 'Twist torso side to side, hold weight for added resistance.', 'core', '{}', 'bodyweight', 'beginner', 'isolation', FALSE),
('Hanging Leg Raises', 'Lower ab focus', 'Raise legs while hanging from bar, control descent.', 'core', '{}', 'bodyweight', 'intermediate', 'isolation', FALSE),
('Cable Crunches', 'Weighted ab work', 'Crunch with cable resistance, pull weight down with abs.', 'core', '{}', 'cable', 'intermediate', 'isolation', FALSE),
('Ab Wheel Rollout', 'Advanced core', 'Roll wheel forward and back, maintain tight core.', 'core', '{}', 'other', 'advanced', 'compound', FALSE),
('Side Plank', 'Oblique stability', 'Hold plank position on side, stack feet and keep body straight.', 'core', '{}', 'bodyweight', 'beginner', 'isolation', FALSE),
('Mountain Climbers', 'Dynamic core exercise', 'Alternate bringing knees to chest from plank position.', 'core', '{}', 'bodyweight', 'beginner', 'compound', FALSE),

-- =====================================================
-- CARDIO
-- =====================================================
('Treadmill Running', 'Cardio endurance', 'Run on treadmill at desired speed and incline.', 'cardio', '{}', 'machine', 'beginner', 'cardio', FALSE),
('Stationary Bike', 'Low impact cardio', 'Cycle on stationary bike, adjust resistance as needed.', 'cardio', '{}', 'machine', 'beginner', 'cardio', FALSE),
('Rowing Machine', 'Full body cardio', 'Row with proper form, drive with legs and pull with arms.', 'cardio', ARRAY['back', 'legs'], 'machine', 'beginner', 'cardio', FALSE),
('Jump Rope', 'High intensity cardio', 'Jump with rope, land softly on balls of feet.', 'cardio', '{}', 'other', 'beginner', 'cardio', FALSE),
('Burpees', 'Full body conditioning', 'Squat, plank, push-up, jump sequence.', 'cardio', '{}', 'bodyweight', 'intermediate', 'cardio', FALSE),
('Elliptical', 'Low impact cardio machine', 'Use elliptical machine with adjustable resistance.', 'cardio', '{}', 'machine', 'beginner', 'cardio', FALSE);
