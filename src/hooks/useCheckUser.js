import { useCallback, useState } from 'react';
import axios from 'axios';
import { API, CAMPAIGN_UUID } from '../constants';

export default function useCheckUser() {
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [userStatus, setUserStatus] = useState(null);

  const checkUser = useCallback(async (email) => {
    try {
      setIsCheckingUser(true);
      const { data } = await axios({
        method: 'POST',
        url: `${API}/check-user`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          campaignUuid: CAMPAIGN_UUID,
          data: { email }
        })
      });
      setUserStatus(data.data.status);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCheckingUser(false);
    }
  }, []);
  return [ isCheckingUser, checkUser, userStatus, setUserStatus ];
}