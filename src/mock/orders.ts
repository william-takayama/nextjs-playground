export const orders = Array.from({ length: 5 }, (_, i) => {
  return {
    number: `1234${i}`,
    details: {
      products: [
        {
          item: `BUNDLE_V2_${i}`,
          qty: i,
        },
      ],
      address: {
        street: `Street XYZ${i}`,
        number: 20 * i,
      },
    },
  };
});
