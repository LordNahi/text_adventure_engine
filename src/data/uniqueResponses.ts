/**
 * If you want to add responses to random types of input, do it here ...
 */

/**
 * TODO: This should somehow be a part of the world data ...
 */

interface IUniqueResponse {
  action: string;
  response: string;
}

export function getUniqueResponse(action: string) {
  for (let actionResponse of randomReponses) {
    if (actionResponse.action === action.toLocaleLowerCase()) {
      return actionResponse.response;
    }
  }
  return false;
}

const randomReponses: IUniqueResponse[] = [
  {
    action: "hello",
    response: "Hello?",
  },
];
