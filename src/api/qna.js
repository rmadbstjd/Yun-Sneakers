import axios from "axios";
import { instance } from "./../utils/instance";
const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});
export async function getNotAnsweredQna() {
  const response = await httpClient.get("/notansweredqna", {});
  const data = response.data;
  return data;
}

export async function getAnsweredQna() {
  const response = await httpClient.get("/qna/answered", {});
  const data = response.data;
  return data;
}

export async function createQna(
  productId,
  title,
  content,
  isSecret,
  dates,
  image
) {
  try {
    const response = await instance.post(`qna/${productId}`, {
      title,
      content,
      isSecret,
      dates,
      image,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
}

export async function editQna(
  productId,
  title,
  content,
  isSecret,
  dates,
  qnaId
) {
  const response = await instance.put(`/qna/${productId}`, {
    title,
    content,
    isSecret,
    dates,
    qnaId,
  });
  const data = response.data;
  return data;
}

export async function answerQna(productId, qnaId, answer) {
  const response = await httpClient.put(`/qna/answer/${productId}`, {
    qnaId,
    answer,
  });
  const data = response.data;
  return data;
}

export async function getQna(productId, page) {
  const response = await httpClient.get(`/qna/${productId}`, {
    headers: {
      page,
    },
  });

  const data = response.data;
  const QnA = data.Qna;
  const count = data.count;
  return { QnA, count };
}

export async function getMyQna(page) {
  const response = await instance.get(`/qna/mypage`, {
    headers: {
      page,
    },
  });
  const data = response.data;
  return data;
}

export async function deleteQna(productId, qnaId) {
  const response = await instance.delete(`/qna/${productId}`, {
    data: { qnaId },
  });
  const data = response.data;
  return data;
}
