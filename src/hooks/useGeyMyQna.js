import { useQuery } from "@tanstack/react-query";
import { getMyQna } from "../api/qna";
export const useGeyMyQna = ({ page }) => {
  let {
    isLoading,
    data: myQnAs,
    refetch,
  } = useQuery(["myQnA"], () => getMyQna(page));
  const QnAcounts = myQnAs && myQnAs.count;

  return { isLoading, myQnAs, QnAcounts, refetch };
};
