// This is a mock AI service. In production, you would integrate with a real AI API
export async function getAISuggestions(taskDescription) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock AI logic to generate suggestions
  const words = taskDescription.toLowerCase().split(' ');
  
  let priority = 'Medium';
  if (words.some(w => ['urgent', 'asap', 'important'].includes(w))) {
    priority = 'High';
  } else if (words.some(w => ['later', 'eventually', 'sometime'].includes(w))) {
    priority = 'Low';
  }

  // Estimate time based on description length
  const estimatedHours = Math.max(1, Math.ceil(words.length / 20));

  return {
    priority,
    estimatedHours,
    suggestedDeadline: new Date(Date.now() + estimatedHours * 3600000).toISOString().split('T')[0],
  };
} 