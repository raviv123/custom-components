import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-custom-checkbox',
  imports: [MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './custom-checkbox.component.html',
  styleUrl: './custom-checkbox.component.scss'
})
export class CustomCheckboxComponent {
//  @Input() formGroup!: FormGroup;
//   @Input() checkboxKey!: string;
//   @Input() label!: string;
@Input() formGroup!: FormGroup;
@Input() checkboxKey!: string;
@Input() label!: string;
@Input() children?: CheckboxItem[]; 

isIndeterminate: boolean = false;

ngOnInit() {
  if (this.children?.length) {
    this.children.forEach(child => {
      this.formGroup.addControl(child.key, this.formGroup.get(child.key) || new FormControl(false));
    });
    this.updateParentState();
  }
}

onCheckboxChange(isChecked: boolean) {
  if (this.children?.length) {
    this.children.forEach(child => {
      this.formGroup.get(child.key)?.setValue(isChecked);
    });
    this.isIndeterminate = false; 
  }
}

updateParentState() {
  if (!this.children?.length) return;
  const selectedChildren = this.children.filter(child => this.formGroup.get(child.key)?.value);
  const totalChildren = this.children.length;
  if (selectedChildren.length === 0) {
    this.formGroup.get(this.checkboxKey)?.setValue(false, { emitEvent: false });
    this.isIndeterminate = false;
  } else if (selectedChildren.length === totalChildren) {
    this.formGroup.get(this.checkboxKey)?.setValue(true, { emitEvent: false });
    this.isIndeterminate = false;
  } else {
    this.isIndeterminate = true;
  }
}

}
interface CheckboxItem {
  key: string;
  label: string;
}