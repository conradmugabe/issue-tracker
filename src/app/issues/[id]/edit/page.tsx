type Props = {
  params: { id: string };
};

export default function EditIssuePage({ params }: Props) {
  return <h1>{params.id}</h1>;
}
