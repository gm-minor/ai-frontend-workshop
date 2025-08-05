/**
 * Basic test to validate Jest setup
 */

describe('Test Setup Validation', () => {
  it('should run basic JavaScript test', () => {
    expect(1 + 1).toBe(2)
  })

  it('should handle basic string operations', () => {
    const greeting = 'Hello, World!'
    expect(greeting).toContain('Hello')
    expect(greeting.length).toBe(13)
  })

  it('should work with arrays', () => {
    const fruits = ['apple', 'banana', 'orange']
    expect(fruits).toHaveLength(3)
    expect(fruits).toContain('banana')
  })

  it('should handle objects', () => {
    const user = { name: 'John', age: 30 }
    expect(user).toHaveProperty('name', 'John')
    expect(user.age).toBeGreaterThan(18)
  })
})
