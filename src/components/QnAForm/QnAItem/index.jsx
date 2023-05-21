import React from "react";
import * as Style from "./styles";
import { AiFillLock } from "@react-icons/all-files/ai/AiFillLock";
import HorizonLine from "../../common/HorizonLine";
const QnAItem = ({
  item,
  index,
  showContent,
  clickToQnAItem,
  QnAList,
  userId,
  editQnAItem,
  deleteQnAItem,
}) => {
  return (
    <Style.QnALayout
      key={`${item.title}+${index}`}
      onClick={() => {
        clickToQnAItem(index);
      }}
      isShow={index === showContent}
    >
      <Style.QnAContainer>
        <Style.QnATitle>
          {item.isSecret ? (
            <Style.LockImg>
              <AiFillLock size={20} style={{ margin: "0px 5px 0px 0px" }} />
            </Style.LockImg>
          ) : null}
          {item.isSecret ? "비밀글입니다." : item.title}
        </Style.QnATitle>
        <Style.QnAInfo>
          <Style.UserId>{item.userId}</Style.UserId>{" "}
          <Style.Dates>{item.dates}</Style.Dates>
          <Style.AnswerBox answered={item.isAnswered}>
            {item.isAnswered ? "yes" : "no"}
          </Style.AnswerBox>
        </Style.QnAInfo>
      </Style.QnAContainer>
      {index === showContent && (
        <Style.QnAContent>{item.content}</Style.QnAContent>
      )}
      {index === showContent && QnAList[index].userId === userId && (
        <Style.ButtonLayout>
          <Style.Button
            onClick={(e) => {
              editQnAItem(e, index);
            }}
          >
            수정
          </Style.Button>
          <Style.Button
            onClick={(e) => {
              deleteQnAItem(e, index);
            }}
          >
            삭제
          </Style.Button>
        </Style.ButtonLayout>
      )}

      {index === showContent && (
        <Style.QnAContent font={"bolder"}>
          {item.isAnswerd && <div>답변</div>}
          {item.answer}
        </Style.QnAContent>
      )}
      <HorizonLine
        width={"100.8%"}
        border={"1px"}
        color={"gray"}
        margin={"10px 0px 0px -10px"}
      />
    </Style.QnALayout>
  );
};

export default QnAItem;
