import { Component, inject, input, OnInit } from '@angular/core';
import { QuickFindStore } from '../store/quick-find.store';
import { IFilter } from '../model/filter';
import { FilterType } from '../store/quick-find.service';

@Component({
  selector: 'en8-qf-modal-filters',
  standalone: true,
  imports: [],
  templateUrl: './qf-modal-filters.component.html',
  styleUrl: './qf-modal-filters.component.scss',
})
export class QFModalFiltersComponent implements OnInit {

  filters!: IFilter[];

  store = inject(QuickFindStore);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locale = input.required<any>();

  ngOnInit(): void {
    this.initFilterTypes();
  }

  initFilterTypes() {
    this.filters = [
      {
        name: this.locale().filters.work_items.all,
        completed: this.store.allWorkItems().completed,
        indeterminate: this.store.allWorkItems().indeterminate,
        subfilters: [
          { name: this.locale().filters.work_items.case, completed: this.store.filters[FilterType.case](), type: FilterType.case },
          { name: this.locale().filters.work_items.ticket, completed: this.store.filters[FilterType.ticket](), type: FilterType.ticket },
          { name: this.locale().filters.work_items.action, completed: this.store.filters[FilterType.action](), type: FilterType.action },
        ],
      }, {
        name: this.locale().filters.comms.all,
        completed: this.store.allComms().completed,
        indeterminate: this.store.allComms().indeterminate,
        subfilters: [
          { name: this.locale().filters.comms.received, completed: this.store.filters[FilterType.inboundEmail](), type: FilterType.inboundEmail },
          { name: this.locale().filters.comms.sent, completed: this.store.filters[FilterType.outboundEmail](), type: FilterType.outboundEmail },
          { name: this.locale().filters.comms.notes, completed: this.store.filters[FilterType.notes](), type: FilterType.notes },
          { name: this.locale().filters.comms.self_service, completed: this.store.filters[FilterType.selfServiceComments](), type: FilterType.selfServiceComments },
        ],
      }, {
        name: this.locale().filters.users.all,
        completed: this.store.allUsers().completed,
        indeterminate: this.store.allUsers().indeterminate,
        subfilters: [
          { name: this.locale().filters.users.external, completed: this.store.filters[FilterType.contact](), type: FilterType.contact },
          { name: this.locale().filters.users.internal, completed: this.store.filters[FilterType.serviceAgent](), type: FilterType.serviceAgent },
        ],
      }, {
        name: this.locale().filters.files.all,
        completed: this.store.allFiles().completed,
        indeterminate: this.store.allFiles().indeterminate,
        subfilters: [
          { name: this.locale().filters.files.work_item, completed: this.store.filters[FilterType.fileAttachmentToPacket](), type: FilterType.fileAttachmentToPacket },
          { name: this.locale().filters.files.communication, completed: this.store.filters[FilterType.fileAttachmentToEmail](), type: FilterType.fileAttachmentToEmail },
        ],
      }
    ]
  }

  updateFilter(completed: boolean, index: number, subindex: number) {
    const chosenFilter = this.filters[index];
    const updatedFilters: { [key: string]: boolean } = {};
    if (subindex === null) {
      chosenFilter.subfilters.forEach(subFilter => {
        updatedFilters[subFilter.type] = completed;
      });
    } else {
      updatedFilters[chosenFilter.subfilters[subindex].type] = completed;
    }
    this.store.updateFilters(updatedFilters);
  }

}
