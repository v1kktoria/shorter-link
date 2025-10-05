import { Injectable } from "@nestjs/common";
import { UAParser } from "ua-parser-js";

@Injectable()
export class UserAgentParserService {
    parse(userAgent: string) {
        const parser = new UAParser();
        parser.setUA(userAgent);
        const result = parser.getResult();

        return {
            browser: result.browser.name,
            browserVersion: result.browser.version,
            os: result.os.name,
        };
    }

}