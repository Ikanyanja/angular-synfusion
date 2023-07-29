import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApolloService } from './apollo-service.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockApolloService: Partial<ApolloService>;

  beforeEach(async () => {
    mockApolloService = {
      getGraphql: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: ApolloService, useValue: mockApolloService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call LoadWithLimit method and set items', async () => {
    // Arrange
    const sampleData = [{ id: 1 }, { id: 2 }, { id: 3 }];
    mockApolloService.getGraphql.mockReturnValue(of(sampleData));

    // Act
    await component.LoadWithLimit();

    // Assert
    expect(component.items).toEqual(sampleData);
  });

  it('should call LoadWithSort method and set sortItems', async () => {
    // Arrange
    const sampleData = [{ id: 1 }, { id: 2 }, { id: 3 }];
    mockApolloService.getGraphql.mockReturnValue(of(sampleData));

    // Act
    await component.LoadWithSort();

    // Assert
    expect(component.sortItems).toEqual(sampleData);
  });

  // Add more test cases for other methods...

  it('should call insert method in ApolloService', () => {
    // Arrange
    mockApolloService.insert.mockReturnValue(of({}));

    // Act
    component.insertItems();

    // Assert
    expect(mockApolloService.insert).toHaveBeenCalledWith(
      'Orders',
      expect.objectContaining({
        OrderID: "12345",
        CustomerID: "98741",
        EmployeeID: "45697",
      })
    );
  });

  it('should call update method in ApolloService', () => {
    // Arrange
    mockApolloService.update.mockReturnValue(of({}));

    // Act
    component.updateItems();

    // Assert
    expect(mockApolloService.update).toHaveBeenCalledWith(
      'Orders',
      'OrderID',
      expect.objectContaining({
        OrderID: "12345",
        CustomerID: "98741",
        EmployeeID: "45697",
      })
    );
  });

  it('should call delete method in ApolloService', () => {
    // Arrange
    mockApolloService.delete.mockReturnValue(of({}));

    // Act
    component.deleteItems();

    // Assert
    expect(mockApolloService.delete).toHaveBeenCalledWith(
      'Orders',
      'OrderID',
      expect.objectContaining({
        OrderID: "12345",
      })
    );
  });
});