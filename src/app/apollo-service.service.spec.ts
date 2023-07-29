 
import { DataManager, Query, ReturnOption, ODataAdaptor } from '@syncfusion/ej2-data';
import { ApolloService } from './apollo-service.service';

// Mock the DataManager and related methods
jest.mock('@syncfusion/ej2-data', () => ({
  DataManager: jest.fn().mockImplementation(() => ({
    executeQuery: jest.fn().mockResolvedValue({ result: [] }),
    insert: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  })),
  Query: jest.fn(),
  ReturnOption: jest.fn(),
  ODataAdaptor: jest.fn(),
}));

describe('ApolloService', () => {
  let apolloService: ApolloService;

  beforeEach(() => {
    apolloService = new ApolloService();
  });

  it('should be created', () => {
    expect(apolloService).toBeTruthy();
  });

  describe('getGraphql', () => {
    it('should fetch data using GraphQL endpoint', async () => {
      const endpoint = 'some-endpoint';
      const result = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];

      // Mock the executeQuery method to return the mocked result
      DataManager.prototype.executeQuery.mockResolvedValueOnce({ result });

      const data = await apolloService.getGraphql(endpoint);

      expect(data).toEqual(result);
      expect(DataManager).toHaveBeenCalledWith({
        url: apolloService.baseUrl,
        adaptor: new ODataAdaptor(),
      });
      expect(Query).toHaveBeenCalledWith().from(endpoint);
    });
  });

  describe('get', () => {
    it('should fetch data from the specified endpoint', async () => {
      const endpoint = 'some-endpoint';
      const result = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];

      // Mock the executeQuery method to return the mocked result
      DataManager.prototype.executeQuery.mockResolvedValueOnce({ result });

      const data = await apolloService.get(endpoint);

      expect(data).toEqual(result);
      expect(DataManager).toHaveBeenCalledWith({
        url: `${apolloService.baseUrl}/${endpoint}`,
        adaptor: new ODataAdaptor(),
      });
      expect(Query).toHaveBeenCalledWith();
    });
  });

  describe('insert', () => {
    it('should call the insert method with the provided endpoint and item', () => {
      const endpoint = 'some-endpoint';
      const insertItem = { id: 3, name: 'Item 3' };

      apolloService.insert(endpoint, insertItem);

      expect(DataManager).toHaveBeenCalledWith({
        url: `${apolloService.baseUrl}/${endpoint}`,
        adaptor: new ODataAdaptor(),
      });
      expect(DataManager.prototype.insert).toHaveBeenCalledWith(insertItem);
    });
  });

  describe('update', () => {
    it('should call the update method with the provided endpoint, primary key, and item', () => {
      const endpoint = 'some-endpoint';
      const pkey = 3;
      const updateItem = { id: 3, name: 'Updated Item 3' };

      apolloService.update(endpoint, pkey, updateItem);

      expect(DataManager).toHaveBeenCalledWith({
        url: `${apolloService.baseUrl}/${endpoint}`,
        adaptor: new ODataAdaptor(),
      });
      expect(DataManager.prototype.update).toHaveBeenCalledWith(pkey, updateItem);
    });
  });

  describe('delete', () => {
    it('should call the remove method with the provided endpoint, primary key, and item', () => {
      const endpoint = 'some-endpoint';
      const pkey = 3;
      const deleteItem = { id: 3, name: 'Item 3' };

      apolloService.delete(endpoint, pkey, deleteItem);

      expect(DataManager).toHaveBeenCalledWith({
        url: `${apolloService.baseUrl}/${endpoint}`,
        adaptor: new ODataAdaptor(),
      });
      expect(DataManager.prototype.remove).toHaveBeenCalledWith(pkey, deleteItem);
    });
  });
});
