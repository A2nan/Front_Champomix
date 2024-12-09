import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqueCompanies',
  standalone: true, // Ajout de standalone: true
})
export class UniqueCompaniesPipe implements PipeTransform {
  transform(users: any[]): number {
    if (!users) return 0;
    const companies = users.map((user) => user.company.name);
    return new Set(companies).size;
  }
}
