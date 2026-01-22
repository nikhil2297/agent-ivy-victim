import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-contact-form',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './contact-form.component.html',
    styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
    // Unique ID prefix for connecting labels and inputs reliably
    readonly id = `contact-form-${Math.random().toString(36).substring(2, 9)}`;

    submitting = signal(false);
    success = signal(false);
    error = signal('');

    @ViewChild('successMsg') successMsg?: ElementRef<HTMLElement>;

    submitForm(event: Event) {
        event.preventDefault();
        this.submitting.set(true);

        // Simulate API call
        setTimeout(() => {
            this.submitting.set(false);
            this.success.set(true);

            // Move focus to the success message to manage focus order
            setTimeout(() => {
                this.successMsg?.nativeElement.focus();
            }, 0);
        }, 2000);
    }
}