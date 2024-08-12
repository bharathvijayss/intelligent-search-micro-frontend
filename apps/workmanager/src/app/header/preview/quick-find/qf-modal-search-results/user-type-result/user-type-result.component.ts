import { Component, computed, input } from '@angular/core';
import { QuickFindResult, userItemResult } from '../../store/dummy-data.constant';
import { FilterType } from '../../store/quick-find.service';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'en8-user-type-result',
  standalone: true,
  templateUrl: './user-type-result.component.html',
  styleUrls: ['./user-type-result.component.scss'],
  imports: [
    MatTooltip
  ]
})
export class UserTypeResultComponent {

  item = input.required({
    transform: (val: QuickFindResult) => (val as userItemResult)
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locale = input.required<any>();

  icon = computed(() => {
    let result = '';
    switch (this.item().type) {
      case FilterType.contact: {
        result = 'contact_page';
        break;
      }
      case FilterType.serviceAgent: {
        result = 'person';
        break;
      }
    }
    return result;
  })

  title = computed(() => {
    return `${this.item().FullName}`
  })

  subtitle = computed(() => {
    return `${this.item().EmailAddress || this.locale().no_email_id}`
  })

  openContact() {
    console.log('open contact');
    // this.tabSrv.OpenContact(this.item().UserGUID);
  }

}
