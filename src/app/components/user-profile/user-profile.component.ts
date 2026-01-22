import { Component, input, signal, effect, viewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
    user = input<{ name: string; email: string; avatar: string; bio: string }>({
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        bio: 'Software Engineer and accessibility enthusiast (ironically).'
    });

    editing = signal(false);

    // References for focus management
    bioInput = viewChild<ElementRef<HTMLTextAreaElement>>('bioInput');
    editBtn = viewChild<ElementRef<HTMLButtonElement>>('editBtn');

    constructor() {
        effect(() => {
            if (this.editing()) {
                // Move focus to the modal input when it opens
                // setTimeout ensures the element is in the DOM
                setTimeout(() => this.bioInput()?.nativeElement.focus());
            } else {
                // Return focus to the trigger button when modal closes
                setTimeout(() => this.editBtn()?.nativeElement.focus());
            }
        });
    }

    toggleEdit() {
        this.editing.update(v => !v);
    }
}