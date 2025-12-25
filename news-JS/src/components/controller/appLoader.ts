import Loader from './loader';
import { LoaderInitOptions } from '../interfaces/interfaces';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL;
        const apiKey = process.env.API_KEY;

        if (!apiUrl || !apiKey) {
            throw new Error('API_URL or API_KEY is not defined in environment variables');
        }
        const options: LoaderInitOptions = {apiKey};

        super(apiUrl, options);
    }
}

export default AppLoader;
