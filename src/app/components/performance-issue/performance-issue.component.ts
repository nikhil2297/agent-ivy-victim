import { Component, OnInit, OnDestroy, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-performance-issue',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './performance-issue.component.html',
    styleUrl: './performance-issue.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceIssueComponent implements OnInit, OnDestroy {
    // Optimization: Use OnPush strategy to reduce change detection cycles

    items = signal<any[]>([]);

    // Optimization: Limit DOM nodes by only rendering a subset (virtualization/pagination approach)
    // In a real app with CDK, use scrolling/virtual-scroll-viewport. 
    // Here we slice the signal to prevent rendering 10,000 nodes.
    displayedItems = computed(() => this.items().slice(0, 50));

    // Optimization: Pre-calculate static heavy values
    calculationResult: number = 0;

    private intervalId: any;

    constructor() {
        // Optimization: Removed blocking busy-wait loop from constructor
    }

    ngOnInit() {
        // Optimization: Move heavy initialization to ngOnInit
        // Optimization: Generate data once and include all necessary display properties (color)
        // to avoid function calls in the template
        const heavyList = [];
        for (let i = 0; i < 10000; i++) {
            heavyList.push({
                id: i,
                text: `Item number ${i}`,
                color: this.generateRandomColor(), // Pre-calculate color
                metadata: {
                    created: new Date().toISOString(),
                    random: Math.random(),
                    nested: {
                        a: i * 2,
                        b: i * 3
                    }
                }
            });
        }
        this.items.set(heavyList);

        // Optimization: Calculate heavy logic once, not in a getter
        this.calculationResult = this.fibonacci(30);

        // Optimization: Monitor logic without memory leak
        this.intervalId = setInterval(() => {
            // Removed leakedData.push() to fix memory leak
            // We just log to show the component is alive without consuming infinite memory
            if (this.items().length > 0) {
                // console.log('Monitor active, memory stable.'); 
            }
        }, 2000); // Increased interval to reduce overhead
    }

    ngOnDestroy() {
        // Optimization: Clear interval to prevent memory leaks when component is destroyed
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    // Optimization: TrackBy function for *ngFor to improve DOM diffing performance
    trackById(index: number, item: any): number {
        return item.id;
    }

    private fibonacci(n: number): number {
        // Memoization could be added here, but calculating once on init is sufficient for this static input
        if (n <= 1) return n;
        return this.fibonacci(n - 1) + this.fibonacci(n - 2);
    }

    private generateRandomColor() {
        // Ensure color has some darkness for visibility against white backgrounds if used for text/borders
        // By limiting the random range, we avoid very light colors (closer to white FFFFFF)
        const maxVal = 0xCCCCCC; 
        return '#' + Math.floor(Math.random() * maxVal).toString(16).padStart(6, '0');
    }
}