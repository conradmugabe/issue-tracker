"use client";

import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, Bar, BarChart, XAxis } from "recharts";

type Props = {
  open: number;
  closed: number;
  inProgress: number;
};

export function IssuesBarChart({ closed, inProgress, open }: Props) {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" axisLine={false} />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
