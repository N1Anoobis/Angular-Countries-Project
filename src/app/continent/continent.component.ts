import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContinentI } from "src/typings";

@Component({
  selector: 'app-continent',
  templateUrl: './continent.component.html',
  styleUrls: ['./continent.component.scss']
})
export class ContinentComponent implements OnInit {
continent: { name: string; }
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
this.continent = {
  name: this.route.snapshot.params['id']
}
console.log(this.continent.name)
  }

}
