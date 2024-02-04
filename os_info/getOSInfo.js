import { cpus } from 'node:os';
import { arch } from 'os';

const getCPUDetails = () => {
    const cpuArr = cpus();
    console.log('Amount of CPUs:', cpuArr.length);
    cpuArr.forEach((cpu, index) => {
        console.log('Num: ', index + 1, 'model: ', cpu.model, ' clock rate: ', cpu.speed, 'GHz');
    });
}

const getCPUArch = () => {
    console.log('CPU architecture:', arch());
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