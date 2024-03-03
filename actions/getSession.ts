/*A utility function that retrieves the current server side session by using
next auth. It can be use in server side of application to access current 
user session*/

import { authOptions } from '@/helpers/authOption';
import { getServerSession } from 'next-auth';

export default async function getSession() {
    return await getServerSession(authOptions);
}