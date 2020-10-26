const decideNDays = () => {
  const width = window.innerWidth;
  const spaceForBoxes = width / Math.phi;
  const numBoxes = Math.floor(spaceForBoxes / 64);
  return numBoxes;
};

const getLastNDays = (n) =>
  reverse(
    [...Array(n)].map((_, i) => {
      const d = dayjs();
      d.setDate(d.getDate() - i);
      return d.getDate();
    })
  );

// getLastNDays(4); [22, 23, 24, 25]

export const getRecents = () => {
  if (typeof window !== "undefined") {
    const numBoxes = decideNDays();
    const lastNDays = getLastNDays(numBoxes);
    return lastNDays;
  }
};
