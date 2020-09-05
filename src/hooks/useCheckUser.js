import { useCallback, useState } from 'react';
import { API, CAMPAIGN_UUID } from '../constants';

export default function useCheckUser() {
  const [isChecking, setIsCheckingUser] = useState(false);
  const checkUser = useCallback(async () => {
    try {
      setIsCheckingUser(true);
      const response = await fetch(`${API}/check-user`, {
        method: 'POST',
        body: JSON.stringify({
          campaignUuid: CAMPAIGN_UUID,
          data: {
            email: 'test@test.com'
          }
        })
      });
      console.log(response);
    } catch (error) {

    } finally {
      setIsCheckingUser(false);
    }
  }, []);
  return [ isChecking, checkUser ];
}