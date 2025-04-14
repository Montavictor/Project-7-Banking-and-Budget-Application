export const sampleData = () => {
  const sampleUsers = [
    {
      name: "Victor Anthony S. Monta",
      address: "Bacoor, Cavite",
      balance: 5000000,
      email: "github.com/montavictor",
      age: 30,
      dateCreated: `${Date.now() - 1000 * 60 * 60 * 24 * 1}`,
      transactions: [
        {
          type: "deposit",
          amount: 500000,
          transactionDate: new Date(
            Date.now() - 1000 * 60 * 60 * 24 * 3
          ).toISOString(),
        },
      ],
    },
    {
      name: "Sam Fernandez",
      address: "Metro Manila, NCR",
      balance: 15000000,
      email: "github.com/fern-sa",
      age: 28,
      dateCreated: `${-1000 * 60 * 60 * 24 * 3 + Date.now()}`,
      transactions: [
        {
          type: "deposit",
          amount: 250000,
          transactionDate: new Date(
            Date.now() - 1000 * 60 * 60 * 24 * 4
          ).toISOString(),
        },
        {
          type: "withraw",
          amount: 2500,
          transactionDate: new Date(
            Date.now() - 1000 * 60 * 60 * 24 * 1
          ).toISOString(),
        },
      ],
    },
  ];
  //"transactions", JSON.stringify(transactions)
  localStorage.setItem("bankUsers", JSON.stringify(sampleUsers));

  return sampleUsers;
};
