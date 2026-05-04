import { render, screen } from "@testing-library/react";
import { Table, type Column } from "../Table";

type User = {
  id: number;
  name: string;
  age: number;
};

const columns: Column<User>[] = [
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Age",
    accessor: "age",
  },
];

const data: User[] = [
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 },
];

describe("Table component", () => {
  test("should renders headers", () => {
    render(<Table columns={columns} data={data} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  test("should renders table data", () => {
    render(<Table columns={columns} data={data} />);

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  test("should shows loading state", () => {
    render(<Table columns={columns} data={[]} isLoading />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should shows empty state when no data", () => {
    render(<Table columns={columns} data={[]} />);

    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  test("should supports accessor function", () => {
    const functionColumns: Column<User>[] = [
      {
        header: "User",
        accessor: (row) => `${row.name} (${row.age})`,
      },
    ];

    render(<Table columns={functionColumns} data={data} />);

    expect(screen.getByText("John (25)")).toBeInTheDocument();
  });

  test("should supports custom render", () => {
    const renderColumns: Column<User>[] = [
      {
        header: "Name",
        accessor: "name",
        render: (value) => <span data-testid="custom">{value}</span>,
      },
    ];

    render(<Table columns={renderColumns} data={data} />);

    expect(screen.getAllByTestId("custom")).toHaveLength(2);
  });
});
