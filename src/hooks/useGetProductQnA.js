import { useQuery } from "@tanstack/react-query";
import { getQna } from "../api/qna";
export const useGetProductQnA = (id, page) => {
  let {
    isLoading,
    data: QnAList,
    refetch,
  } = useQuery(["qna"], () => getQna(id, page));
  const QnAcounts = QnAList?.count?.length;
  QnAList = QnAList?.QnA;

  return { isLoading, QnAcounts, QnAList, refetch };
};
