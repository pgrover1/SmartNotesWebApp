// Function to get a consistent color for a category
export const getCategoryColor = (categoryId) => {
  // List of tailwind colors
  const colors = [
    'bg-red-200',
    'bg-orange-200',
    'bg-amber-200',
    'bg-yellow-200',
    'bg-lime-200',
    'bg-green-200',
    'bg-emerald-200',
    'bg-teal-200',
    'bg-cyan-200',
    'bg-sky-200',
    'bg-blue-200',
    'bg-indigo-200',
    'bg-violet-200',
    'bg-purple-200',
    'bg-fuchsia-200',
    'bg-pink-200',
    'bg-rose-200',
  ];

  // Use the category ID to determine a consistent color
  const hash = categoryId.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  return colors[Math.abs(hash) % colors.length];
};

// Function to get sentiment color 
export const getSentimentColor = (sentiment) => {
  if (!sentiment) return 'bg-gray-200';
  
  const sentimentLower = sentiment.toLowerCase();
  
  if (sentimentLower.includes('positive')) return 'bg-green-200';
  if (sentimentLower.includes('negative')) return 'bg-red-200';
  if (sentimentLower.includes('neutral')) return 'bg-blue-200';
  if (sentimentLower.includes('mixed')) return 'bg-purple-200';
  
  return 'bg-gray-200';
};

// Format date
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}`,
  };
}