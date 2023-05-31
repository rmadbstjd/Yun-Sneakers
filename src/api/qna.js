import axios from "axios";
import { instance } from "./../utils/instance";
const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export async function getNotAnsweredQna() {
  try {
    const response = await httpClient.get("/qna/notanswered", {});
    if (response.statusText) return response.data;
  } catch (error) {
    return false;
  }
}

export async function getAnsweredQna() {
  try {
    const response = await httpClient.get("/qna/answered", {});
    if (response.statusText) return response.data;
  } catch (error) {
    return false;
  }
}

export async function getQna(productId, page) {
  try {
    const response = await httpClient.get(`/qna/product/${productId}`, {
      headers: {
        page,
      },
    });
    if (response.statusText) {
      const data = response.data;
      const QnA = data.Qna;
      const count = data.count;
      return { QnA, count };
    }
  } catch (error) {
    return false;
  }
}

export async function getMyQna(page) {
  try {
    const response = await instance.get(`/qna/mypage`, {
      headers: {
        page,
      },
    });
    if (response.statusText) {
      return response.data;
    }
  } catch (error) {
    return false;
  }
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
    const response = await instance.post(`/qna/product/${productId}`, {
      title,
      content,
      isSecret,
      dates,
      image,
    });
    if (response.statusText) return true;
  } catch (error) {
    return false;
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
  try {
    const response = await instance.put(`/qna/product/${productId}/${qnaId}`, {
      title,
      content,
      isSecret,
      dates,
      qnaId,
    });
    if (response.statusText) return true;
  } catch (error) {
    return false;
  }
}

export async function answerQna(qnaId, answer) {
  try {
    const response = await httpClient.put(`/qna/answer/${qnaId}`, {
      qnaId,
      answer,
    });
    if (response.statusText) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

export async function deleteQna(qnaId) {
  try {
    const response = await instance.delete(`/qna/${qnaId}`, {});
    if (response.statusText) return response.data;
  } catch (error) {
    return false;
  }
}
