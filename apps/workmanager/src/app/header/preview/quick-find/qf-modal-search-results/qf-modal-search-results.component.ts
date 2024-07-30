import { Component, inject } from '@angular/core';
import { QuickFindStore } from '../store/quick-find.store';
import { FilterType } from '../store/quick-find.service';
import { WorkItemTypeResultComponent } from './work-item-type-result/work-item-type-result.component';
import { UserTypeResultComponent } from './user-type-result/user-type-result.component';
import { CommunicationTypeResultComponent } from './communication-type-result/communication-type-result.component';
import { AttachmentTypeResultComponent } from './attachment-type-result/attachment-type-result.component';

@Component({
  selector: 'en8-qf-modal-search-results',
  standalone: true,
  imports: [
    WorkItemTypeResultComponent,
    UserTypeResultComponent,
    CommunicationTypeResultComponent,
    AttachmentTypeResultComponent
  ],
  templateUrl: './qf-modal-search-results.component.html',
  styleUrl: './qf-modal-search-results.component.scss',
})
export class QuickFindModalSearchResultsComponent {

  store = inject(QuickFindStore);

  FilterType = FilterType;

}
