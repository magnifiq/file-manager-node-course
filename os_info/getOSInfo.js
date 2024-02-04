import { cpus } from 'node:os';
import { EOL } from 'os';
import { arch } from 'os';
import { userInfo } from 'os';

const getCPUDetails = () => {
    const cpuArr = cpus();
    console.log('Amount of CPUs:', cpuArr.length);
    cpuArr.forEach((cpu, index) => {
        console.log('Num: ', index + 1, 'model: ', cpu.model, ' clock rate: ', cpu.speed, 'GHz');
    });
}

const getEOL=()=> {
    console.log('EOL: ', EOL === '\n' ? '\\n' : '\\r\\n');
}

const getCPUArch = () => {
    console.log('CPU architecture:', arch());
}

const getUsername=()=>{
    try {
        console.log('Username: ', userInfo().username);
    }
    catch (error) {
        console.log('Invalid input');
    }
}

export const getOSInfo=(arg) => {
    switch (arg) {
        case '--cpus':
            getCPUDetails();
            break;
        case '--EOL':
            getEOL();
            break;
        case '--homedir':
            getHomedir();
            break;
        case '--username':
            getUsername();
            break;
        case '--architecture':
            getCPUArch();
            break;
        default:
            console.log('Invalid input');
    }
}