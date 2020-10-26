const getLastNDays = (n) =>
  reverse(
    [...Array(n)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.getDate();
    })
  );

// getLastNDays(4); [22, 23, 24, 25]

export default getLastNDays;
