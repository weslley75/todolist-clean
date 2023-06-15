interface Task {
  id: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

type TaskProps = Partial<Omit<Task, "id">> & Pick<Task, 'description'>

export class TaskEntity implements Task {
  id: string;
  description: string;
  private _isCompleted: boolean;
  readonly createdAt: Date;
  private _updatedAt?: Date;

  constructor(props: TaskProps, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.description = props.description;
    this._isCompleted = props.isCompleted ?? false;
    this.createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt;
  }

  toggleCompleted() {
    this._isCompleted = !this._isCompleted;
  }

  get isCompleted() {
    return this._isCompleted;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  toJSON(): Task {
    return {
      id: this.id,
      description: this.description,
      isCompleted: this._isCompleted,
      createdAt: this.createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
