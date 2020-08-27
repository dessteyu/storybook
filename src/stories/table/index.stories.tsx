import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { CustomTable, TableProps, Column } from "./table";
export default {
  title: "Paps/CustomTable",
  component: CustomTable,
  argTypes: {},
} as Meta;
interface product {
  name: string;
  price: string;
}
const products: product[] = [
  {
    name: "banana",
    price: "1000",
  },
  {
    name: "banana1",
    price: "1000",
  },
  {
    name: "banana2",
    price: "1000",
  },
  {
    name: "banana3",
    price: "1000",
  },
  {
    name: "orange",
    price: "2000",
  },
  {
    name: "orange1",
    price: "2000",
  },
  {
    name: "orange2",
    price: "2000",
  },
  {
    name: "orange3",
    price: "2000",
  },
  {
    name: "Cacao",
    price: "4000",
  },
  {
    name: "Cacao1",
    price: "4000",
  },
  {
    name: "Cacao2",
    price: "4000",
  },
  {
    name: "Cacao3",
    price: "4000",
  },
  {
    name: "Apple",
    price: "1000",
  },
  {
    name: "Apple1",
    price: "1000",
  },
  {
    name: "Apple2",
    price: "1000",
  },
  {
    name: "Apple3",
    price: "1000",
  },
  {
    name: "raspberry",
    price: "9000",
  },
  {
    name: "raspberry1",
    price: "9000",
  },
  {
    name: "raspberry2",
    price: "9000",
  },
  {
    name: "raspberry1",
    price: "9000",
  },
];
const columnslist: Column<product>[] = [
  {
    field: "name",
    title: "name",
  },
  {
    field: "price",
    title: "price",
  },
];

const Template: Story<TableProps> = (args: TableProps) => (
  <CustomTable {...args} />
);
export const DefaultTable = Template.bind({});
DefaultTable.args = {
  title: "table",
  columns: columnslist,
  tableData: products,
  rowsIdentifier: "name",
  hasSelection: true,
  asAction: true,
  isLoading: false,
  orderByIdentifier: "name",
};
