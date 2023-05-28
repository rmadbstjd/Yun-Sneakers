import { useQuery } from "@tanstack/react-query";
import { getQna } from "../api/product";
export const useGetProductQnA = (id, page) => {
  let { data: QnAList, refetch } = useQuery(["qna"], () => getQna(id, page));
  const QnAcounts = QnAList?.count?.length;
  QnAList = QnAList?.QnA;

  return { QnAcounts, QnAList, refetch };
};
