
type Id = string

/**
 * This type represents a tree node in the asset hierarchy.
 * An empty array of children indicates that the node is a leaf node.
 * The type parameter T is used to distinguish between different types of nodes.
 * An empty parent field indicates that the node is the root of the tree.
 */
export interface TreeNode<T extends string> {
  id: Id
  name: string
  type: T
  children: TreeNode<string>[]
  parent?: TreeNode<string>
}

export interface Component extends TreeNode<'component'> {
  children: []
  parent?: Asset | Location

  sensorType: 'energy' | 'vibration'
  status: 'operating' | 'alert'
}

export interface Asset extends TreeNode<'asset'> {
  children: (Asset | Component)[]
  parent?: Asset | Location
}

export interface Location extends TreeNode<'location'> {
  children: (Location | Asset | Component)[]
  parent?: Location
}

export type TopLevelNode = Location | Asset | Component
