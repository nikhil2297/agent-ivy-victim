import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent {
    notifications = signal(true);
    darkMode = signal(false);
    emailFrequency = signal('daily');

    toggleNotifications() {
        this.notifications.update(v => !v);
    }

    toggleDarkMode() {
        this.darkMode.update(v => !v);
    }

    setFrequency(freq: string) {
        this.emailFrequency.set(freq);
    }
}