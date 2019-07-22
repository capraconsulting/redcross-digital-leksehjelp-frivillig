import { mocked } from 'ts-jest/utils';
import axios from 'axios';
import {
  getQuestion,
  getQuestionList,
  saveAnswer,
} from '../services/api-service';

beforeAll(() => {
  mocked(axios.create().post).mockReset();
});

describe('api-service', () => {
  it('TEST: getQuestion \n Should return question with id=1', async () => {
    const question = await getQuestion('1');
    expect(question.id).toEqual(1);
  });
  it('TEST: getQuestionList \n Should create request on the form: "questions/unanswered", input: unanswered', async () => {
    const url = await getQuestionList('inbox');
    expect(url).toEqual('questions/unanswered');
  });
  it('TEST: getQuestionList \n Should create request on the form: "questions/edit", input: edit', async () => {
    const url = await getQuestionList('started');
    expect(url).toEqual('questions/edit');
  });
  it('TEST: getQuestionList \n Should create request on the form: "questions/approve", input: approve', async () => {
    const url = await getQuestionList('approval');
    expect(url).toEqual('questions/approve');
  });
  it('TEST: getQuestionList \n Should create request on the form: "questions", input: test', async () => {
    const url = await getQuestionList('test');
    expect(url).toEqual('questions');
  });
  it('TEST: getQuestionList \n Should create request on the form: "questions", input: ', async () => {
    const url = await getQuestionList();
    expect(url).toEqual('questions');
  });

  const mock = axios.create();

  it('TEST: saveAnswer \n Should work', async () => {
    mocked(mock.post).mockResolvedValue({});
    await saveAnswer({
      questionId: ':id',
      answerText: 'answer',
      title: 'title',
      questionText: 'text',
    });

    const call = mocked(mock.post).mock.calls[0];

    expect(call[0]).toEqual('questions/:id/edit');
    expect(call[1]).toEqual({ answerText: 'answer' });
  });
});
