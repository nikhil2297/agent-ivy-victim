import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-inaccessible-demo',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './inaccessible-demo.component.html',
    styleUrls: ['./inaccessible-demo.component.scss']
})
export class InaccessibleDemoComponent {

    formData = {
        username: '',
        password: '',
        comments: ''
    };

    isSubmitting = false;

    fakeSubmit() {
        this.isSubmitting = true;
        setTimeout(() => {
            this.isSubmitting = false;
            alert('Form submitted (but you probably did not know it was processing!)');
        }, 2000);
    }

    doExampleAction() {
        console.log('Action performed');
    }
}
