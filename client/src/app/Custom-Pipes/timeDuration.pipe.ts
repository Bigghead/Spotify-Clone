import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatDuration'
})

export class TimeDurationPipe implements PipeTransform {

    transform(value: number) {

        var minutes = Math.floor(value / 60000);
        var seconds = parseInt(((value % 60000) / 1000).toFixed(0));
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

    }
}