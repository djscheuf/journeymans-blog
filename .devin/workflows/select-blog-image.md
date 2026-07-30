---
description: Select appropriate header image for blog post from image library
---

# Select Blog Image Workflow

## Purpose
Analyze blog post content and select the most appropriate header image from the indexed image library.

## Inputs Required
- Blog post content (Hemingway section)
- Image index path: `{repo_root}/source/img/post_img/image-index.json`

## Workflow Steps

### Step 1: Extract Post Characteristics
```
Analyze the blog post content and identify:
1. Main themes (3-5 high-level topics)
2. Key concepts (specific ideas discussed)
3. Emotional tone/mood
4. Primary use case or application context
```

### Step 2: Load Image Index
```
Read: {repo_root}/source/img/post_img/image-index.json
Parse: images array with metadata (themes, concepts, mood, use_cases)
```

### Step 3: Score Each Image
```
For each image, calculate relevance score:

Theme Match (40%):
  count(post_themes ∩ image_themes) / max(count(post_themes), count(image_themes))

Concept Match (40%):
  count(post_concepts ∩ image_concepts) / max(count(post_concepts), count(image_concepts))

Mood Alignment (15%):
  1.0 if any mood matches, 0.0 otherwise

Use Case Relevance (5%):
  count(post_use_cases ∩ image_use_cases) / max(count(post_use_cases), count(image_use_cases))

Total Score = (Theme × 0.4) + (Concept × 0.4) + (Mood × 0.15) + (UseCase × 0.05)
```

### Step 4: Select and Return
```
Sort images by score (descending)
Select top match

IF score >= 0.5:
  Return selected image path
ELSE:
  Return selected image + alternatives + ask user to confirm
```

## Output Format
```json
{
  "selected_image": "/img/post_img/agile_team.png",
  "confidence": 0.85,
  "reasoning": "Themes: team collaboration, agile. Concepts: scrum teams, problem-solving.",
  "alternatives": ["/img/post_img/conversation.jpg", "/img/post_img/thinker.png"]
}
```

## Next Action
→ Return to calling workflow with selected image path
