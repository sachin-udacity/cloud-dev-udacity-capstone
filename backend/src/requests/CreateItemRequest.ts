/**
 * Fields in a request to create a single item.
 */
export interface CreateItemRequest {
  name: string
  dueDate: string
  attachmentUrl?: string
}
