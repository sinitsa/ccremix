import { format, fromUnixTime } from "date-fns";
import { ru } from "date-fns/locale";
//import { ValueFormatterParams } from "ag-grid-community";

export const timestampFormatter = (timestamp?: number, mask: string = "dd.MM.yyy") =>
  timestamp
    ? format(fromUnixTime(timestamp), mask, { locale: ru })
    : ""

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

export const periodName = (period: string) =>
  months[Number(period.substr(-2))-1] +  " " + period.substr(0, 4)
/*
const dateFormatter = (params: ValueFormatterParams) =>
  format(fromUnixTime(params.value), "dd.MM.yyy", { locale: ru });

 const paymentsColumnDefs = [
  {
    headerName: "Дата",
    field: "timestamp",
    valueFormatter: dateFormatter
  },
  {
    headerName: "Сумма",
    field: "amount"
  },
  {
    headerName: "Подробнее",
    cellClass: "cell-wrap-text",
    autoHeight: true,
    field: "description"
  }
]; */