import { useCallback, useState } from 'react';
import axios from 'axios';
import { API, CAMPAIGN_UUID } from '../constants';

export default function useCreateAccount() {
  const [isCreatingAccount, setIsCreatingAccount] = useState();
  const [createAccountStatus, setCreateAccountStatus] = useState({ code: null, message: '' });

  const createAccount = useCallback(async (payload) => {
    try {
      setIsCreatingAccount(true);
      const { data } = await axios({
        method: 'POST',
        url: `${API}/signup`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          campaignUuid: CAMPAIGN_UUID,
          data: payload,
        })
      });
      setCreateAccountStatus({
        code: data.data.status,
        message: data.message
      });
    } catch (error) {
      const { data } = error.response;
      setCreateAccountStatus({
        code: data.status,
        message: data.errors[0].message
      });
    } finally {
      setIsCreatingAccount(false);
    }
  }, []);
  return [isCreatingAccount, createAccount, createAccountStatus, setCreateAccountStatus];
}

