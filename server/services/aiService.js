import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateAIContent(project) {
  try {
    const prompt = `
Analyze this GitHub project and provide:
1. A concise, professional summary (2-3 sentences)
2. Relevant technology tags (max 8)
3. Skills demonstrated (max 6)
4. Complexity score (1-10)

Project: ${project.title}
Description: ${project.description}
Language: ${project.language}
Languages: ${project.languages?.map(l => `${l.name} (${l.percentage}%)`).join(', ')}

Respond in JSON format:
{
  "summary": "...",
  "tags": ["tag1", "tag2", ...],
  "skills": ["skill1", "skill2", ...],
  "complexityScore": 7
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert software engineer analyzing GitHub projects. Provide accurate, professional assessments."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.3
    });

    const content = response.choices[0].message.content;
    const aiContent = JSON.parse(content);

    return {
      summary: aiContent.summary || 'AI-generated summary not available',
      tags: aiContent.tags || [],
      skills: aiContent.skills || [],
      complexityScore: aiContent.complexityScore || 5
    };
  } catch (error) {
    console.error('AI generation error:', error);
    
    // Fallback content
    return {
      summary: `A ${project.language || 'software'} project demonstrating modern development practices and technical skills.`,
      tags: project.language ? [project.language] : [],
      skills: project.language ? [project.language] : [],
      complexityScore: 5
    };
  }
}

export async function generateUserSummary(user, projects) {
  try {
    const projectSummaries = projects.slice(0, 5).map(p => 
      `${p.title}: ${p.description} (${p.language})`
    ).join('\n');

    const prompt = `
Create a professional summary for this developer based on their projects:

Name: ${user.name}
Type: ${user.type}
Skills: ${user.skills.join(', ')}
Bio: ${user.bio}

Recent Projects:
${projectSummaries}

Generate a 2-3 sentence professional summary highlighting their expertise and strengths.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional recruiter writing developer summaries. Be concise and highlight key strengths."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.3
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('User summary generation error:', error);
    return `Experienced ${user.type} with expertise in ${user.skills.slice(0, 3).join(', ')} and a passion for building innovative solutions.`;
  }
}