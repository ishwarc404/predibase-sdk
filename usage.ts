import { PredibaseClient } from './client'

// Create an instance
const client = new PredibaseClient({
  apiToken: '',
  tenantId: '',
  deployment: 'llama-2-7b'
});


client.generateTokens(
  `
    Below is an instruction that describes a task, paired with an input
    that may provide further context. Write a response that appropriately
    completes the request.

    ### Instruction: Write an algorithm in Java to reverse the words in a string.

    ### Input: The quick brown fox

    ### Response:
    `)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
