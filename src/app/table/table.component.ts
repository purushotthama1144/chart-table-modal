import { Component, Injectable, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';


export class TodoItemNode {
  children: TodoItemNode[] = [];
  item: any;
}

export class TodoItemFlatNode {
  item: string = "";
  level: any;
  expandable: boolean = false;
}

// Response
const TREE_DATA = {
  firstLevel: [
    {
      firstLevelId: 1,
      firstLevelType: 'Test first Level 1',
      firstLevelName: 'Test first Level 1',
      secondLevel: [
        {
          secondLevelId: 2,
          secondLevelName: "Test 2",
          thirdLevel: [
            {
              thirdLevelId: 3,
              thirdLevelName: "Test 3",
            },
            {
              thirdLevelId: 3,
              thirdLevelName: "Test 3",
            },
          ]
        },
        {
          secondLevelId: 2,
          secondLevelName: "Test 2",
          thirdLevel: [
            {
              thirdLevelId: 3,
              thirdLevelName: "Test 3",
            },
          ]
        },
      ]
    },
    {
      firstLevelId: 2,
      firstLevelType: 'Test first Level 2',
      firstLevelName: 'Test first Level 2',
      secondLevel: [
        {
          secondLevelId: 2,
          secondLevelName: "Test 2",
          thirdLevel: [
            {
              thirdLevelId: 3,
              thirdLevelName: "Test 3",
            },
          ]
        },
        {
          secondLevelId: 2,
          secondLevelName: "Test 2",
          thirdLevel: [
            {
              thirdLevelId: 3,
              thirdLevelName: "Test 3",
            },
            {
              thirdLevelId: 3,
              thirdLevelName: "Test 3",
            },
          ]
        },
      ]
    },
  ],
};

// Service
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    const output = this.buildFileTree(TREE_DATA);
    this.dataChange.next(output);
    console.log(output);
  }

  buildFileTree(data: any): TodoItemNode[] {
    const treeStructure: TodoItemNode[] = [];
    data.firstLevel.forEach((firstLevelItem: any) => {
      const firstLevelNode = new TodoItemNode();
      firstLevelNode.item = `${firstLevelItem.firstLevelId} - ${firstLevelItem.firstLevelName} - ${firstLevelItem.firstLevelType}`;
      firstLevelNode.children = [];

      if (firstLevelItem.secondLevel) {
        firstLevelItem.secondLevel.forEach((secondLevelItem: any) => {
          const secondLevelNode = new TodoItemNode();
          secondLevelNode.item = `    ${secondLevelItem.secondLevelId} - ${secondLevelItem.secondLevelName}`;
          secondLevelNode.children = [];

          if (secondLevelItem.thirdLevel) {
            secondLevelItem.thirdLevel.forEach((thirdLevelItem: any) => {
              const thirdLevelNode = new TodoItemNode();
              thirdLevelNode.item = `${thirdLevelItem.thirdLevelId} - ${thirdLevelItem.thirdLevelName}`;
              secondLevelNode.children.push(thirdLevelNode);
            });
          }
          firstLevelNode.children.push(secondLevelNode);
        });
      }
      treeStructure.push(firstLevelNode);
    });
    return treeStructure;
  }
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
  selectedParent: TodoItemFlatNode | null = null;
  newItemName = '';
  treeControl: FlatTreeControl<TodoItemFlatNode>;
  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true);

  constructor(private _database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item ? existingNode : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
}
