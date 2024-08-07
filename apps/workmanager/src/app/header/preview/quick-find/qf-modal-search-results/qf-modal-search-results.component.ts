import { Component, computed, inject, input } from '@angular/core';
import { QuickFindStore } from '../store/quick-find.store';
import { FilterType } from '../store/quick-find.service';
import { WorkItemTypeResultComponent } from './work-item-type-result/work-item-type-result.component';
import { UserTypeResultComponent } from './user-type-result/user-type-result.component';
import { CommunicationTypeResultComponent } from './communication-type-result/communication-type-result.component';
import { AttachmentTypeResultComponent } from './attachment-type-result/attachment-type-result.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'en8-qf-modal-search-results',
  standalone: true,
  imports: [
    WorkItemTypeResultComponent,
    UserTypeResultComponent,
    CommunicationTypeResultComponent,
    AttachmentTypeResultComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './qf-modal-search-results.component.html',
  styleUrl: './qf-modal-search-results.component.scss',
})
export class QuickFindModalSearchResultsComponent {

  store = inject(QuickFindStore);

  FilterType = FilterType;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locale = input.required<any>();

  translateSrv = inject(TranslateService);

  resultCount = computed(() => {
    return this.translateSrv.instant('header.intelligent_search.result_count', {
      t: this.store.filteredResult().length
    })
  })

}
