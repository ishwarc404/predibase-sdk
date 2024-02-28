import { axiosInstance } from './networking';
import  {AxiosRequestConfig} from 'axios';


interface PredibaseClientOptions {
    apiToken: string;
    tenantId: string;
    deployment: string;
}

interface GenerateTokensOptions {
    adapter_id?: string;
    adapter_source?: 'hub' | 's3';
    do_sample?: boolean;
    max_new_tokens?: number;
    best_of?: number;
    repetition_penalty?: number;
    return_full_text?: boolean;
    stop?: string[];
    seed?: number;
    temperature?: number;
    top_k?: number;
    top_p?: number;
    truncate?: number;
    typical_p?: number;
    watermark?: boolean;
    decoder_input_details?: boolean;
}

export class PredibaseClient {
    private apiToken: string;
    private tenantId: string;
    private deployment: string;

    constructor(options: PredibaseClientOptions) {
        // Read values from environment variables if options are not provided
        this.apiToken = options.apiToken ;
        this.tenantId = options.tenantId ;
        this.deployment = options.deployment ;

        // Validate if required environment variables are provided
        if (!this.apiToken || !this.tenantId || !this.deployment) {
            throw new Error('Missing required environment variables');
        }
    }
    public async generateTokens(inputs: string, options?: GenerateTokensOptions): Promise<any> {
        const url = `/${this.tenantId}/deployments/v2/llms/${this.deployment}/generate`;

        const data = {
            inputs,
            parameters: options || {}
        };

        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiToken}`
            }
        };

        try {
            const response = await axiosInstance.post(url, data, config); // Use axiosInstance from networking.ts
            return response.data;
        } catch (error) {
            // Handle error here
            throw new Error(`Failed to generate tokens` + error);
        }
    }
}
