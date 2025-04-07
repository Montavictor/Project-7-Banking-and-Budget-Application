import bankUsers from "./users.json";

export const sampleData = () => {
  const sampleUsers = [
    {
      name: "Victor Anthony S. Monta",
      address: "Bacoor, Cavite",
      balance: 50000,
      email: "github.com/montavictor",
      age: 30,
      dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      transactions: [
        {
          type: "deposit",
          amount: 50000,
          transactionDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        },
      ],
    },
    {
      name: "Sam Fernandez",
      address: "Metro Manila, NCR",
      balance: 150000,
      email: "http://github.com/fern-sa",
      age: 28,
      dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      transactions: [
        {
          type: "deposit",
          amount: 250000,
          transactionDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
        },
        {
          type: "withraw",
          amount: 2500,
          transactionDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
        },
      ],
    },
  ];
  bankUsers.push(sampleUsers);
  return sampleUsers;
};
